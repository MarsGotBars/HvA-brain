export const exp = (t: number) =>
	1 / (1 + t + 0.48 * t * t + 0.235 * t * t * t);

/**
 * Damp, based on Game Programming Gems 4 Chapter 1.10
 *   Return value indicates whether the animation is still running.
 */
export function damp(
	/** The object */
	current: { [key: string]: any },
	/** The key to animate */
	prop: string,
	/** To goal value */
	target: number,
	/** Approximate time to reach the target. A smaller value will reach the target faster. */
	smoothTime = 0.25,
	/** Frame delta, for refreshrate independence */
	delta = 0.01,
	/** Optionally allows you to clamp the maximum speed. If smoothTime is 0.25s and looks OK
	 *  going between two close points but not for points far apart as it'll move very rapid,
	 *  then a maxSpeed of e.g. 1 which will clamp the speed to 1 unit per second, it may now
	 *  take much longer than smoothTime to reach the target if it is far away. */
	maxSpeed = Infinity,
	/** Easing function */
	easing = exp,
	/** End of animation precision */
	eps = 0.001
) {
	const vel = 'velocity_' + prop;
	if (current.__damp === undefined) current.__damp = {};
	if (current.__damp[vel] === undefined) current.__damp[vel] = 0;

	if (Math.abs(current[prop] - target) <= eps) {
		current[prop] = target;
		return false;
	}

	smoothTime = Math.max(0.0001, smoothTime);
	const omega = 2 / smoothTime;
	const t = easing(omega * delta);
	let change = current[prop] - target;
	const originalTo = target;
	// Clamp maximum maxSpeed
	const maxChange = maxSpeed * smoothTime;
	change = Math.min(Math.max(change, -maxChange), maxChange);
	target = current[prop] - change;
	const temp = (current.__damp[vel] + omega * change) * delta;
	current.__damp[vel] = (current.__damp[vel] - omega * temp) * t;
	let output = target + (change + temp) * t;
	// Prevent overshooting
	if (originalTo - current[prop] > 0.0 === output > originalTo) {
		output = originalTo;
		current.__damp[vel] = (output - originalTo) / delta;
	}
	current[prop] = output;
	return true;
}
